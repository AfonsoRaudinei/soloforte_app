// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'client_detail_controller.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$clientByIdHash() => r'b696ea76b2f4d7e9f5255a9f3e670e4a17f50b2a';

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

/// See also [clientById].
@ProviderFor(clientById)
const clientByIdProvider = ClientByIdFamily();

/// See also [clientById].
class ClientByIdFamily extends Family<AsyncValue<Client?>> {
  /// See also [clientById].
  const ClientByIdFamily();

  /// See also [clientById].
  ClientByIdProvider call(String clientId) {
    return ClientByIdProvider(clientId);
  }

  @override
  ClientByIdProvider getProviderOverride(
    covariant ClientByIdProvider provider,
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
  String? get name => r'clientByIdProvider';
}

/// See also [clientById].
class ClientByIdProvider extends AutoDisposeFutureProvider<Client?> {
  /// See also [clientById].
  ClientByIdProvider(String clientId)
    : this._internal(
        (ref) => clientById(ref as ClientByIdRef, clientId),
        from: clientByIdProvider,
        name: r'clientByIdProvider',
        debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
            ? null
            : _$clientByIdHash,
        dependencies: ClientByIdFamily._dependencies,
        allTransitiveDependencies: ClientByIdFamily._allTransitiveDependencies,
        clientId: clientId,
      );

  ClientByIdProvider._internal(
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
    FutureOr<Client?> Function(ClientByIdRef provider) create,
  ) {
    return ProviderOverride(
      origin: this,
      override: ClientByIdProvider._internal(
        (ref) => create(ref as ClientByIdRef),
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
  AutoDisposeFutureProviderElement<Client?> createElement() {
    return _ClientByIdProviderElement(this);
  }

  @override
  bool operator ==(Object other) {
    return other is ClientByIdProvider && other.clientId == clientId;
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
mixin ClientByIdRef on AutoDisposeFutureProviderRef<Client?> {
  /// The parameter `clientId` of this provider.
  String get clientId;
}

class _ClientByIdProviderElement
    extends AutoDisposeFutureProviderElement<Client?>
    with ClientByIdRef {
  _ClientByIdProviderElement(super.provider);

  @override
  String get clientId => (origin as ClientByIdProvider).clientId;
}

String _$clientFarmsHash() => r'65a03358fffa890a58c4d1b0e480f88ae1ff83c9';

/// See also [clientFarms].
@ProviderFor(clientFarms)
const clientFarmsProvider = ClientFarmsFamily();

/// See also [clientFarms].
class ClientFarmsFamily extends Family<AsyncValue<List<Farm>>> {
  /// See also [clientFarms].
  const ClientFarmsFamily();

  /// See also [clientFarms].
  ClientFarmsProvider call(String clientId) {
    return ClientFarmsProvider(clientId);
  }

  @override
  ClientFarmsProvider getProviderOverride(
    covariant ClientFarmsProvider provider,
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
  String? get name => r'clientFarmsProvider';
}

/// See also [clientFarms].
class ClientFarmsProvider extends AutoDisposeFutureProvider<List<Farm>> {
  /// See also [clientFarms].
  ClientFarmsProvider(String clientId)
    : this._internal(
        (ref) => clientFarms(ref as ClientFarmsRef, clientId),
        from: clientFarmsProvider,
        name: r'clientFarmsProvider',
        debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
            ? null
            : _$clientFarmsHash,
        dependencies: ClientFarmsFamily._dependencies,
        allTransitiveDependencies: ClientFarmsFamily._allTransitiveDependencies,
        clientId: clientId,
      );

  ClientFarmsProvider._internal(
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
    FutureOr<List<Farm>> Function(ClientFarmsRef provider) create,
  ) {
    return ProviderOverride(
      origin: this,
      override: ClientFarmsProvider._internal(
        (ref) => create(ref as ClientFarmsRef),
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
    return _ClientFarmsProviderElement(this);
  }

  @override
  bool operator ==(Object other) {
    return other is ClientFarmsProvider && other.clientId == clientId;
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
mixin ClientFarmsRef on AutoDisposeFutureProviderRef<List<Farm>> {
  /// The parameter `clientId` of this provider.
  String get clientId;
}

class _ClientFarmsProviderElement
    extends AutoDisposeFutureProviderElement<List<Farm>>
    with ClientFarmsRef {
  _ClientFarmsProviderElement(super.provider);

  @override
  String get clientId => (origin as ClientFarmsProvider).clientId;
}

String _$clientHistoryHash() => r'5d5af64078e6d54df148da9b4eb6c76195dcb3e8';

/// See also [clientHistory].
@ProviderFor(clientHistory)
const clientHistoryProvider = ClientHistoryFamily();

/// See also [clientHistory].
class ClientHistoryFamily extends Family<AsyncValue<List<ClientHistory>>> {
  /// See also [clientHistory].
  const ClientHistoryFamily();

  /// See also [clientHistory].
  ClientHistoryProvider call(String clientId) {
    return ClientHistoryProvider(clientId);
  }

  @override
  ClientHistoryProvider getProviderOverride(
    covariant ClientHistoryProvider provider,
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
  String? get name => r'clientHistoryProvider';
}

/// See also [clientHistory].
class ClientHistoryProvider
    extends AutoDisposeFutureProvider<List<ClientHistory>> {
  /// See also [clientHistory].
  ClientHistoryProvider(String clientId)
    : this._internal(
        (ref) => clientHistory(ref as ClientHistoryRef, clientId),
        from: clientHistoryProvider,
        name: r'clientHistoryProvider',
        debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
            ? null
            : _$clientHistoryHash,
        dependencies: ClientHistoryFamily._dependencies,
        allTransitiveDependencies:
            ClientHistoryFamily._allTransitiveDependencies,
        clientId: clientId,
      );

  ClientHistoryProvider._internal(
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
    FutureOr<List<ClientHistory>> Function(ClientHistoryRef provider) create,
  ) {
    return ProviderOverride(
      origin: this,
      override: ClientHistoryProvider._internal(
        (ref) => create(ref as ClientHistoryRef),
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
  AutoDisposeFutureProviderElement<List<ClientHistory>> createElement() {
    return _ClientHistoryProviderElement(this);
  }

  @override
  bool operator ==(Object other) {
    return other is ClientHistoryProvider && other.clientId == clientId;
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
mixin ClientHistoryRef on AutoDisposeFutureProviderRef<List<ClientHistory>> {
  /// The parameter `clientId` of this provider.
  String get clientId;
}

class _ClientHistoryProviderElement
    extends AutoDisposeFutureProviderElement<List<ClientHistory>>
    with ClientHistoryRef {
  _ClientHistoryProviderElement(super.provider);

  @override
  String get clientId => (origin as ClientHistoryProvider).clientId;
}

String _$clientStatsHash() => r'15b6045674783984567bdb6c4398f981914935ce';

/// See also [clientStats].
@ProviderFor(clientStats)
const clientStatsProvider = ClientStatsFamily();

/// See also [clientStats].
class ClientStatsFamily extends Family<AsyncValue<ClientStats>> {
  /// See also [clientStats].
  const ClientStatsFamily();

  /// See also [clientStats].
  ClientStatsProvider call(String clientId) {
    return ClientStatsProvider(clientId);
  }

  @override
  ClientStatsProvider getProviderOverride(
    covariant ClientStatsProvider provider,
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
  String? get name => r'clientStatsProvider';
}

/// See also [clientStats].
class ClientStatsProvider extends AutoDisposeFutureProvider<ClientStats> {
  /// See also [clientStats].
  ClientStatsProvider(String clientId)
    : this._internal(
        (ref) => clientStats(ref as ClientStatsRef, clientId),
        from: clientStatsProvider,
        name: r'clientStatsProvider',
        debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
            ? null
            : _$clientStatsHash,
        dependencies: ClientStatsFamily._dependencies,
        allTransitiveDependencies: ClientStatsFamily._allTransitiveDependencies,
        clientId: clientId,
      );

  ClientStatsProvider._internal(
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
    FutureOr<ClientStats> Function(ClientStatsRef provider) create,
  ) {
    return ProviderOverride(
      origin: this,
      override: ClientStatsProvider._internal(
        (ref) => create(ref as ClientStatsRef),
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
  AutoDisposeFutureProviderElement<ClientStats> createElement() {
    return _ClientStatsProviderElement(this);
  }

  @override
  bool operator ==(Object other) {
    return other is ClientStatsProvider && other.clientId == clientId;
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
mixin ClientStatsRef on AutoDisposeFutureProviderRef<ClientStats> {
  /// The parameter `clientId` of this provider.
  String get clientId;
}

class _ClientStatsProviderElement
    extends AutoDisposeFutureProviderElement<ClientStats>
    with ClientStatsRef {
  _ClientStatsProviderElement(super.provider);

  @override
  String get clientId => (origin as ClientStatsProvider).clientId;
}

// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member, deprecated_member_use_from_same_package
