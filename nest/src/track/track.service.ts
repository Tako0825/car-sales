import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, track_event } from '@prisma/client';
import { ResponseData } from 'src/common/class/response.data';
import { CommonService } from 'src/common/common.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateTrackBatchDto } from './dto/create-track-batch.dto';
import { CreateTrackEventDto } from './dto/create-track-event.dto';

@Injectable()
export class TrackService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commonService: CommonService,
  ) {}

  async createBatch(createTrackBatchDto: CreateTrackBatchDto) {
    const { events } = createTrackBatchDto;

    if (!events?.length) {
      throw new HttpException(
        {
          tip: 'events 不允许为空',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.commonService.handlePrismaExecution<ResponseData>(
      async () => {
        const data = events.map((event) => this.transformEvent(event));
        const result = await this.prisma.track_event.createMany({
          data,
          skipDuplicates: true,
        });

        return {
          tip: '埋点写入成功',
          inserted: result.count,
        };
      },
    );
  }

  async getDashboard() {
    return await this.commonService.handlePrismaExecution<Record<string, any>>(
      async () => {
        const performanceAverages = await this.getPerformanceAverages();
        const [
          totalEvents,
          pageViews,
          monitorEvents,
          activeUsers,
          activeSessions,
          eventTypes,
          routeRanking,
          eventTrend,
          deviceDistribution,
        ] = await Promise.all([
          this.prisma.track_event.count(),
          this.prisma.track_event.count({
            where: {
              type: 'page_view',
            },
          }),
          this.prisma.track_event.count({
            where: {
              category: 'monitor',
            },
          }),
          this.getDistinctCount('uid'),
          this.getDistinctCount('sid'),
          this.getEventTypes(),
          this.getRouteRanking(),
          this.getEventTrend(),
          this.getDeviceDistribution(),
        ]);

        return {
          summary: {
            totalEvents,
            pageViews,
            monitorEvents,
            activeUsers,
            activeSessions,
            avgLoad: performanceAverages.load,
          },
          eventTypes,
          routeRanking,
          eventTrend,
          deviceDistribution,
          performanceAverages,
        };
      },
    );
  }

  private transformEvent(
    event: CreateTrackEventDto,
  ): Prisma.track_eventCreateManyInput {
    const eventTime = new Date(event.ts);

    return {
      eventId: this.truncate(event.id, 64),
      category: this.truncate(event.category, 20),
      type: this.truncate(event.type, 50),
      level: this.truncate(event.level, 10),
      appId: this.truncate(event.ctx.appId, 100),
      appName: this.optionalString(event.ctx.appName, 100),
      release: this.optionalString(event.ctx.release, 50),
      env: this.optionalString(event.ctx.env, 20),
      uid: this.optionalUid(event.ctx.uid),
      sid: this.truncate(event.ctx.sid, 64),
      url: this.truncate(event.ctx.url, 500),
      route: this.optionalString(event.ctx.route, 255),
      ua: this.optionalString(event.ctx.ua, 500),
      deviceType: this.optionalString(event.ctx.deviceType, 50),
      eventTime: Number.isNaN(eventTime.getTime()) ? new Date() : eventTime,
      payload: this.sanitizePayload(event.payload),
    };
  }

  private sanitizePayload(payload: Record<string, any>): Prisma.InputJsonValue {
    const normalized = this.cloneAsPlainObject(payload);

    if (typeof normalized.stack === 'string') {
      normalized.stack = this.truncate(normalized.stack, 2000);
    }

    if (Array.isArray(normalized.breadcrumbs)) {
      normalized.breadcrumbs = normalized.breadcrumbs.slice(0, 30);
    }

    return normalized as Prisma.InputJsonValue;
  }

  private cloneAsPlainObject(payload: Record<string, any>) {
    try {
      return JSON.parse(JSON.stringify(payload ?? {}));
    } catch (error) {
      return {
        raw: '[unserializable payload]',
      };
    }
  }

  private truncate(value: string, maxLength: number) {
    return value.slice(0, maxLength);
  }

  private optionalString(value: unknown, maxLength: number) {
    if (typeof value !== 'string' || !value.length) {
      return undefined;
    }

    return this.truncate(value, maxLength);
  }

  private optionalUid(value: unknown) {
    if (typeof value === 'number') {
      return String(value);
    }

    if (typeof value === 'string' && value.length) {
      return this.truncate(value, 64);
    }

    return undefined;
  }

  private async getDistinctCount(field: 'uid' | 'sid') {
    const rows =
      field === 'uid'
        ? await this.prisma.track_event.findMany({
            where: {
              uid: {
                not: null,
              },
            },
            distinct: ['uid'],
            select: {
              uid: true,
            },
          })
        : await this.prisma.track_event.findMany({
            distinct: ['sid'],
            select: {
              sid: true,
            },
          });

    return rows.length;
  }

  private async getEventTypes() {
    const result = await this.prisma.track_event.groupBy({
      by: ['type'],
      _count: {
        type: true,
      },
      orderBy: {
        _count: {
          type: 'desc',
        },
      },
    });

    return result.map((item) => ({
      name: item.type,
      value: item._count.type,
    }));
  }

  private async getRouteRanking(limit = 7) {
    const result = await this.prisma.track_event.groupBy({
      by: ['route'],
      where: {
        type: 'page_view',
        route: {
          not: null,
        },
      },
      _count: {
        route: true,
      },
      orderBy: {
        _count: {
          route: 'desc',
        },
      },
      take: limit,
    });

    return {
      routes: result.map((item) => item.route || 'unknown'),
      counts: result.map((item) => item._count.route),
    };
  }

  private async getDeviceDistribution() {
    const result = await this.prisma.track_event.groupBy({
      by: ['deviceType'],
      where: {
        deviceType: {
          not: null,
        },
      },
      _count: {
        deviceType: true,
      },
      orderBy: {
        _count: {
          deviceType: 'desc',
        },
      },
    });

    return result.map((item) => ({
      name: item.deviceType || 'unknown',
      value: item._count.deviceType,
    }));
  }

  private async getEventTrend(days = 7) {
    type TrendRow = {
      day: Date;
      total: bigint | number;
      pageViewCount: bigint | number;
      apiErrorCount: bigint | number;
      jsErrorCount: bigint | number;
      performanceCount: bigint | number;
    };

    const startDate = this.getStartOfDay(days - 1);
    const rows = await this.prisma.$queryRaw<TrendRow[]>`
      SELECT
        DATE(eventTime) AS day,
        COUNT(*) AS total,
        SUM(type = 'page_view') AS pageViewCount,
        SUM(type = 'api_error') AS apiErrorCount,
        SUM(type = 'js_error') AS jsErrorCount,
        SUM(type = 'performance') AS performanceCount
      FROM track_event
      WHERE eventTime >= ${startDate}
      GROUP BY DATE(eventTime)
      ORDER BY day ASC
    `;

    const trendMap = new Map(
      rows.map((item) => [
        this.formatDate(item.day),
        {
          total: this.toNumber(item.total),
          pageView: this.toNumber(item.pageViewCount),
          apiError: this.toNumber(item.apiErrorCount),
          jsError: this.toNumber(item.jsErrorCount),
          performance: this.toNumber(item.performanceCount),
        },
      ]),
    );

    const dates: string[] = [];
    const total: number[] = [];
    const pageView: number[] = [];
    const apiError: number[] = [];
    const jsError: number[] = [];
    const performance: number[] = [];

    for (let index = days - 1; index >= 0; index -= 1) {
      const currentDate = this.getStartOfDay(index);
      const key = this.formatDate(currentDate);
      const current = trendMap.get(key) || {
        total: 0,
        pageView: 0,
        apiError: 0,
        jsError: 0,
        performance: 0,
      };

      dates.push(key);
      total.push(current.total);
      pageView.push(current.pageView);
      apiError.push(current.apiError);
      jsError.push(current.jsError);
      performance.push(current.performance);
    }

    return {
      dates,
      total,
      pageView,
      apiError,
      jsError,
      performance,
    };
  }

  private async getPerformanceAverages() {
    const performanceEvents = await this.prisma.track_event.findMany({
      where: {
        type: 'performance',
      },
      select: {
        payload: true,
      },
    });

    const metrics = ['fp', 'fcp', 'ttfb', 'domReady', 'load'] as const;
    const sums = {
      fp: 0,
      fcp: 0,
      ttfb: 0,
      domReady: 0,
      load: 0,
    };
    const counts = {
      fp: 0,
      fcp: 0,
      ttfb: 0,
      domReady: 0,
      load: 0,
    };

    performanceEvents.forEach((item) => {
      metrics.forEach((metric) => {
        const value = this.readPayloadNumber(item.payload, metric);

        if (typeof value === 'number') {
          sums[metric] += value;
          counts[metric] += 1;
        }
      });
    });

    const averages = {
      fp: this.divideOrZero(sums.fp, counts.fp),
      fcp: this.divideOrZero(sums.fcp, counts.fcp),
      ttfb: this.divideOrZero(sums.ttfb, counts.ttfb),
      domReady: this.divideOrZero(sums.domReady, counts.domReady),
      load: this.divideOrZero(sums.load, counts.load),
    };

    return {
      ...averages,
      names: ['FP', 'FCP', 'TTFB', 'DOM Ready', 'Load'],
      values: [
        averages.fp,
        averages.fcp,
        averages.ttfb,
        averages.domReady,
        averages.load,
      ],
    };
  }

  private readPayloadNumber(payload: Prisma.JsonValue, key: string) {
    if (!payload || Array.isArray(payload) || typeof payload !== 'object') {
      return undefined;
    }

    const value = (payload as Record<string, unknown>)[key];

    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === 'string') {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : undefined;
    }

    return undefined;
  }

  private divideOrZero(sum: number, count: number) {
    if (!count) {
      return 0;
    }

    return Number((sum / count).toFixed(2));
  }

  private getStartOfDay(offsetDays: number) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - offsetDays);
    return date;
  }

  private formatDate(value: Date) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  private toNumber(value: bigint | number | null) {
    if (typeof value === 'bigint') {
      return Number(value);
    }

    return Number(value || 0);
  }
}
