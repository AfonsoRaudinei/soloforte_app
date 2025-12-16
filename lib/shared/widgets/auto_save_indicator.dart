import 'package:flutter/material.dart';

/// Widget de indicador de auto-save visual
class AutoSaveIndicator extends StatefulWidget {
  final bool isSaving;
  final DateTime? lastSaved;
  final String? message;

  const AutoSaveIndicator({
    super.key,
    this.isSaving = false,
    this.lastSaved,
    this.message,
  });

  @override
  State<AutoSaveIndicator> createState() => _AutoSaveIndicatorState();
}

class _AutoSaveIndicatorState extends State<AutoSaveIndicator>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );
    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeInOut));
  }

  @override
  void didUpdateWidget(AutoSaveIndicator oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isSaving != oldWidget.isSaving) {
      if (widget.isSaving) {
        _controller.repeat(reverse: true);
      } else {
        _controller.forward().then((_) {
          Future.delayed(const Duration(seconds: 2), () {
            if (mounted) _controller.reverse();
          });
        });
      }
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _fadeAnimation,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: widget.isSaving ? Colors.orange[100] : Colors.green[100],
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: widget.isSaving ? Colors.orange[300]! : Colors.green[300]!,
            width: 1,
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (widget.isSaving)
              SizedBox(
                width: 14,
                height: 14,
                child: CircularProgressIndicator(
                  strokeWidth: 2,
                  valueColor: AlwaysStoppedAnimation<Color>(
                    Colors.orange[700]!,
                  ),
                ),
              )
            else
              Icon(Icons.check_circle, size: 14, color: Colors.green[700]),
            const SizedBox(width: 6),
            Text(
              _getMessage(),
              style: TextStyle(
                fontSize: 11,
                color: widget.isSaving ? Colors.orange[900] : Colors.green[900],
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _getMessage() {
    if (widget.isSaving) {
      return widget.message ?? 'Salvando...';
    }

    if (widget.lastSaved != null) {
      final diff = DateTime.now().difference(widget.lastSaved!);
      if (diff.inSeconds < 60) {
        return 'Salvo agora';
      } else if (diff.inMinutes < 60) {
        return 'Salvo há ${diff.inMinutes}min';
      } else {
        return 'Salvo há ${diff.inHours}h';
      }
    }

    return widget.message ?? 'Salvo';
  }
}

/// Provider para gerenciar estado de auto-save
class AutoSaveNotifier extends ChangeNotifier {
  bool _isSaving = false;
  DateTime? _lastSaved;
  String? _message;

  bool get isSaving => _isSaving;
  DateTime? get lastSaved => _lastSaved;
  String? get message => _message;

  void startSaving({String? message}) {
    _isSaving = true;
    _message = message;
    notifyListeners();
  }

  void finishSaving() {
    _isSaving = false;
    _lastSaved = DateTime.now();
    _message = null;
    notifyListeners();
  }

  void setMessage(String message) {
    _message = message;
    notifyListeners();
  }
}

/// Widget de badge de auto-save flutuante
class FloatingAutoSaveBadge extends StatelessWidget {
  final bool isSaving;
  final DateTime? lastSaved;

  const FloatingAutoSaveBadge({
    super.key,
    this.isSaving = false,
    this.lastSaved,
  });

  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: 16,
      right: 16,
      child: AutoSaveIndicator(isSaving: isSaving, lastSaved: lastSaved),
    );
  }
}

/// Mixin para adicionar funcionalidade de auto-save a widgets
mixin AutoSaveMixin<T extends StatefulWidget> on State<T> {
  final AutoSaveNotifier _autoSaveNotifier = AutoSaveNotifier();

  AutoSaveNotifier get autoSaveNotifier => _autoSaveNotifier;

  Future<void> autoSave(Future<void> Function() saveFunction) async {
    _autoSaveNotifier.startSaving();
    try {
      await saveFunction();
      _autoSaveNotifier.finishSaving();
    } catch (e) {
      _autoSaveNotifier.setMessage('Erro ao salvar');
      _autoSaveNotifier.finishSaving();
    }
  }

  @override
  void dispose() {
    _autoSaveNotifier.dispose();
    super.dispose();
  }
}

/// Widget de toast de auto-save
class AutoSaveToast {
  static void show(
    BuildContext context, {
    required bool success,
    String? message,
  }) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(
              success ? Icons.check_circle : Icons.error,
              color: Colors.white,
              size: 20,
            ),
            const SizedBox(width: 12),
            Text(
              message ?? (success ? 'Salvo automaticamente' : 'Erro ao salvar'),
            ),
          ],
        ),
        backgroundColor: success ? Colors.green : Colors.red,
        duration: const Duration(seconds: 2),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      ),
    );
  }
}

/// Widget de indicador de sincronização
class SyncIndicator extends StatefulWidget {
  final bool isSyncing;
  final DateTime? lastSynced;
  final int? pendingChanges;

  const SyncIndicator({
    super.key,
    this.isSyncing = false,
    this.lastSynced,
    this.pendingChanges,
  });

  @override
  State<SyncIndicator> createState() => _SyncIndicatorState();
}

class _SyncIndicatorState extends State<SyncIndicator>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );
    if (widget.isSyncing) {
      _controller.repeat();
    }
  }

  @override
  void didUpdateWidget(SyncIndicator oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isSyncing != oldWidget.isSyncing) {
      if (widget.isSyncing) {
        _controller.repeat();
      } else {
        _controller.stop();
      }
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: widget.isSyncing
            ? Colors.blue[100]
            : widget.pendingChanges != null && widget.pendingChanges! > 0
            ? Colors.orange[100]
            : Colors.grey[100],
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (widget.isSyncing)
            RotationTransition(
              turns: _controller,
              child: Icon(Icons.sync, size: 14, color: Colors.blue[700]),
            )
          else if (widget.pendingChanges != null && widget.pendingChanges! > 0)
            Icon(Icons.cloud_upload, size: 14, color: Colors.orange[700])
          else
            Icon(Icons.cloud_done, size: 14, color: Colors.grey[600]),
          const SizedBox(width: 6),
          Text(
            _getMessage(),
            style: TextStyle(
              fontSize: 11,
              color: widget.isSyncing
                  ? Colors.blue[900]
                  : widget.pendingChanges != null && widget.pendingChanges! > 0
                  ? Colors.orange[900]
                  : Colors.grey[700],
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  String _getMessage() {
    if (widget.isSyncing) {
      return 'Sincronizando...';
    }

    if (widget.pendingChanges != null && widget.pendingChanges! > 0) {
      return '${widget.pendingChanges} pendente(s)';
    }

    if (widget.lastSynced != null) {
      final diff = DateTime.now().difference(widget.lastSynced!);
      if (diff.inSeconds < 60) {
        return 'Sincronizado';
      } else if (diff.inMinutes < 60) {
        return 'Sync há ${diff.inMinutes}min';
      } else {
        return 'Sync há ${diff.inHours}h';
      }
    }

    return 'Não sincronizado';
  }
}
