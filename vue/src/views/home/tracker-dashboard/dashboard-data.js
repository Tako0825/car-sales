import api from "@/api";

export function createDefaultDashboardState() {
  return {
    loading: true,
    summary: {},
    eventTypes: [],
    deviceDistribution: [],
    routeRanking: {
      routes: [],
      counts: [],
    },
    eventTrend: {
      dates: [],
      total: [],
      pageView: [],
      apiError: [],
      jsError: [],
      performance: [],
    },
    performanceAverages: {
      names: [],
      values: [],
      fp: 0,
      fcp: 0,
      ttfb: 0,
      domReady: 0,
      load: 0,
    },
  };
}

export async function loadDashboardData(vm) {
  const dashboard = await api.get("/api/track/dashboard");
  vm.summary = dashboard.summary || {};
  vm.eventTrend = dashboard.eventTrend || vm.eventTrend;
  vm.eventTypes = dashboard.eventTypes || [];
  vm.routeRanking = dashboard.routeRanking || vm.routeRanking;
  vm.deviceDistribution = dashboard.deviceDistribution || [];
  vm.performanceAverages =
    dashboard.performanceAverages || vm.performanceAverages;
  vm.loading = false;
}

export function formatNumber(value) {
  const numeric = Number(value || 0);
  return Number.isInteger(numeric) ? numeric : numeric.toFixed(2);
}
