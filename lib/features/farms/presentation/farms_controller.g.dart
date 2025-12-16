// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'farms_controller.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$farmsByClientHash() => r'3e05986e2e0e42143b6c686853b1adcf221dde57';

/// Copied from Dart SDK
class _SystemHash {
  _SystemHash._();

  static int combine(int hash, int value) {
    // ignore: parameter_assignments
    hash = 0x1fffffff & (hash + value);
    // ignore: parameter_assignments
    hash = 0x1fffffff & (hash + ((0x0007ffff & hash) << 10));
    return hash ^ (hash >> 6);
  }

  static int finish(int hash) {
    // ignore: parameter_assignments
    hash = 0x1fffffff & (hash + ((0x03ffffff & hash) << 3));
    // ignore: parameter_assignments
    hash = hash ^ (hash >> 11);
    return 0x1fffffff & (hash + ((0x00003fff & hash) << 15));
  }
}

/// See also [farmsByClient].
@ProviderFor(farmsByClient)
const farmsByClientProvider = FarmsByClientFamily();

/// See also [farmsByClient].
class FarmsByClientFamily extends Family<AsyncValue<List<Farm>>> {
  /// See also [farmsByClient].
  const FarmsByClientFamily();

  /// See also [farmsByClient].
  FarmsByClientProvider call(String clientId) {
    return FarmsByClientProvider(clientId);
  }

  @override
  FarmsByClientProvider getProviderOverride(
    covariant FarmsByClientProvider provider,
  ) {
    return call(provider.clientId);
  }

  static const Iterable<ProviderOrFamily>? _dependencies = null;

  @override
  Iterable<ProviderOrFamily>? get dependencies => _dependencies;

  static const Iterable<ProviderOrFamily>? _allTransitiveDependencies = null;

  @override
  Iterable<ProviderOrFamily>? get allTransitiveDependencies =>
      _allTransitiveDependencies;

  @override
  String? get name => r'farmsByClientProvider';
}

/// See also [farmsByClient].
class FarmsByClientProvider extends AutoDisposeFutureProvider<List<Farm>> {
  /// See also [farmsByClient].
  FarmsByClientProvider(String clientId)
    : this._internal(
        (ref) => farmsByClient(ref as FarmsByClientRef, clientId),
        from: farmsByClientProvider,
        name: r'farmsByClientProvider',
        debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
            ? null
            : _$farmsByClientHash,
        dependencies: FarmsByClientFamily._dependencies,
        allTransitiveDependencies:
            FarmsByClientFamily._allTransitiveDependencies,
        clientId: clientId,
      );

  FarmsByClientProvider._internal(
    super._createNotifier, {
    required super.name,
    required super.dependencies,
    required super.allTransitiveDependencies,
    required super.debugGetCreateSourceHash,
    required super.from,
    required this.clientId,
  }) : super.internal();

  final String clientId;

  @override
  Override overrideWith(
    FutureOr<List<Farm>> Function(FarmsByClientRef provider) create,
  ) {
    return ProviderOverride(
      origin: this,
      override: FarmsByClientProvider._internal(
        (ref) => create(ref as FarmsByClientRef),
        from: from,
        name: null,
        dependencies: null,
        allTransitiveDependencies: null,
        debugGetCreateSourceHash: null,
        clientId: clientId,
      ),
    );
  }

  @override
  AutoDisposeFutureProviderElement<List<Farm>> createElement() {
    return _FarmsByClientProviderElement(this);
  }

  @override
  bool operator ==(Object other) {
    return other is FarmsByClientProvider && other.clientId == clientId;
  }

  @override
  int get hashCode {
    var hash = _SystemHash.combine(0, runtimeType.hashCode);
    hash = _SystemHash.combine(hash, clientId.hashCode);

    return _SystemHash.finish(hash);
  }
}

@Deprecated('Will be removed in 3.0. Use Ref instead')
// ignore: unused_element
mixin FarmsByClientRef on AutoDisposeFutureProviderRef<List<Farm>> {
  /// The parameter `clientId` of this provider.
  String get clientId;
}

class _FarmsByClientProviderElement
    extends AutoDisposeFutureProviderElement<List<Farm>>
    with FarmsByClientRef {
  _FarmsByClientProviderElement(super.provider);

  @override
  String get clientId => (origin as FarmsByClientProvider).clientId;
}

String _$farmByIdHash() => r'a3d2071dd992a5c08b093718f8305168170afd27';

/// See also [farmById].
@ProviderFor(farmById)
const farmByIdProvider = FarmByIdFamily();

/// See also [farmById].
class FarmByIdFamily extends Family<AsyncValue<Farm?>> {
  /// See also [farmById].
  const FarmByIdFamily();

  /// See also [farmById].
  FarmByIdProvider call(String id) {
    return FarmByIdProvider(id);
  }

  @override
  FarmByIdProvider getProviderOverride(covariant FarmByIdProvider provider) {
    return call(provider.id);
  }

  static const Iterable<ProviderOrFamily>? _dependencies = null;

  @override
  Iterable<ProviderOrFamily>? get dependencies => _dependencies;

  static const Iterable<ProviderOrFamily>? _allTransitiveDependencies = null;

  @override
  Iterable<ProviderOrFamily>? get allTransitiveDependencies =>
      _allTransitiveDependencies;

  @override
  String? get name => r'farmByIdProvider';
}

/// See also [farmById].
class FarmByIdProvider extends AutoDisposeFutureProvider<Farm?> {
  /// See also [farmById].
  FarmByIdProvider(String id)
    : this._internal(
        (ref) => farmById(ref as FarmByIdRef, id),
        from: farmByIdProvider,
        name: r'farmByIdProvider',
        debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
            ? null
            : _$farmByIdHash,
        dependencies: FarmByIdFamily._dependencies,
        allTransitiveDependencies: FarmByIdFamily._allTransitiveDependencies,
        id: id,
      );

  FarmByIdProvider._internal(
    super._createNotifier, {
    required super.name,
    required super.dependencies,
    required super.allTransitiveDependencies,
    required super.debugGetCreateSourceHash,
    required super.from,
    required this.id,
  }) : super.internal();

  final String id;

  @override
  Override overrideWith(FutureOr<Farm?> Function(FarmByIdRef provider) create) {
    return ProviderOverride(
      origin: this,
      override: FarmByIdProvider._internal(
        (ref) => create(ref as FarmByIdRef),
        from: from,
        name: null,
        dependencies: null,
        allTransitiveDependencies: null,
        debugGetCreateSourceHash: null,
        id: id,
      ),
    );
  }

  @override
  AutoDisposeFutureProviderElement<Farm?> createElement() {
    return _FarmByIdProviderElement(this);
  }

  @override
  bool operator ==(Object other) {
    return other is FarmByIdProvider && other.id == id;
  }

  @override
  int get hashCode {
    var hash = _SystemHash.combine(0, runtimeType.hashCode);
    hash = _SystemHash.combine(hash, id.hashCode);

    return _SystemHash.finish(hash);
  }
}

@Deprecated('Will be removed in 3.0. Use Ref instead')
// ignore: unused_element
mixin FarmByIdRef on AutoDisposeFutureProviderRef<Farm?> {
  /// The parameter `id` of this provider.
  String get id;
}

class _FarmByIdProviderElement extends AutoDisposeFutureProviderElement<Farm?>
    with FarmByIdRef {
  _FarmByIdProviderElement(super.provider);

  @override
  String get id => (origin as FarmByIdProvider).id;
}

String _$farmsControllerHash() => r'9095c6a11c9ec9ef9e83043f53f021763caa2ce9';

/// See also [FarmsController].
@ProviderFor(FarmsController)
final farmsControllerProvider =
    AutoDisposeAsyncNotifierProvider<FarmsController, List<Farm>>.internal(
      FarmsController.new,
      name: r'farmsControllerProvider',
      debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
          ? null
          : _$farmsControllerHash,
      dependencies: null,
      allTransitiveDependencies: null,
    );

typedef _$FarmsController = AutoDisposeAsyncNotifier<List<Farm>>;
// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member, deprecated_member_use_from_same_package
