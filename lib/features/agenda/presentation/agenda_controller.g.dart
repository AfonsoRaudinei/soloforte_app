// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'agenda_controller.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, type=warning

@ProviderFor(AgendaController)
const agendaControllerProvider = AgendaControllerProvider._();

final class AgendaControllerProvider
    extends $AsyncNotifierProvider<AgendaController, List<Event>> {
  const AgendaControllerProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'agendaControllerProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$agendaControllerHash();

  @$internal
  @override
  AgendaController create() => AgendaController();
}

String _$agendaControllerHash() => r'351999a67b051a607f6c88117bbd6ba3f0a6e1cd';

abstract class _$AgendaController extends $AsyncNotifier<List<Event>> {
  FutureOr<List<Event>> build();
  @$mustCallSuper
  @override
  void runBuild() {
    final created = build();
    final ref = this.ref as $Ref<AsyncValue<List<Event>>, List<Event>>;
    final element =
        ref.element
            as $ClassProviderElement<
              AnyNotifier<AsyncValue<List<Event>>, List<Event>>,
              AsyncValue<List<Event>>,
              Object?,
              Object?
            >;
    element.handleValue(ref, created);
  }
}
