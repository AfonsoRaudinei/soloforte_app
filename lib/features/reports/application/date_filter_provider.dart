import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'date_filter_provider.g.dart';

enum DateRangeFilter {
  last7Days('Últimos 7 dias'),
  last30Days('Últimos 30 dias'),
  last90Days('Últimos 90 dias'),
  thisMonth('Este mês'),
  lastMonth('Mês passado'),
  custom('Personalizado');

  final String label;
  const DateRangeFilter(this.label);
}

class DateFilterState {
  final DateRangeFilter filter;
  final DateTime? customStartDate;
  final DateTime? customEndDate;

  const DateFilterState({
    this.filter = DateRangeFilter.last30Days,
    this.customStartDate,
    this.customEndDate,
  });

  DateRange get dateRange {
    final now = DateTime.now();
    switch (filter) {
      case DateRangeFilter.last7Days:
        return DateRange(
          start: now.subtract(const Duration(days: 7)),
          end: now,
        );
      case DateRangeFilter.last30Days:
        return DateRange(
          start: now.subtract(const Duration(days: 30)),
          end: now,
        );
      case DateRangeFilter.last90Days:
        return DateRange(
          start: now.subtract(const Duration(days: 90)),
          end: now,
        );
      case DateRangeFilter.thisMonth:
        return DateRange(start: DateTime(now.year, now.month, 1), end: now);
      case DateRangeFilter.lastMonth:
        final lastMonth = DateTime(now.year, now.month - 1, 1);
        final lastDayOfLastMonth = DateTime(now.year, now.month, 0);
        return DateRange(start: lastMonth, end: lastDayOfLastMonth);
      case DateRangeFilter.custom:
        return DateRange(
          start: customStartDate ?? now.subtract(const Duration(days: 30)),
          end: customEndDate ?? now,
        );
    }
  }

  DateFilterState copyWith({
    DateRangeFilter? filter,
    DateTime? customStartDate,
    DateTime? customEndDate,
  }) {
    return DateFilterState(
      filter: filter ?? this.filter,
      customStartDate: customStartDate ?? this.customStartDate,
      customEndDate: customEndDate ?? this.customEndDate,
    );
  }
}

class DateRange {
  final DateTime start;
  final DateTime end;

  DateRange({required this.start, required this.end});
}

@riverpod
class DateFilter extends _$DateFilter {
  @override
  DateFilterState build() {
    return const DateFilterState();
  }

  void setFilter(DateRangeFilter filter) {
    state = state.copyWith(filter: filter);
  }

  void setCustomRange(DateTime start, DateTime end) {
    state = state.copyWith(
      filter: DateRangeFilter.custom,
      customStartDate: start,
      customEndDate: end,
    );
  }
}
