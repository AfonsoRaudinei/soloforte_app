import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import '../domain/harvest_model.dart';

class HarvestListScreen extends StatefulWidget {
  const HarvestListScreen({super.key});

  @override
  State<HarvestListScreen> createState() => _HarvestListScreenState();
}

class _HarvestListScreenState extends State<HarvestListScreen> {
  // Mock Data
  final List<Harvest> _harvests = [
    Harvest(
      id: '1',
      clientId: '1',
      clientName: 'Fazenda Santa Rita',
      date: DateTime.now().subtract(const Duration(days: 2)),
      cropType: 'Soja',
      quantityTon: 150.5,
      storageLocation: 'Silo A',
    ),
    Harvest(
      id: '2',
      clientId: '2',
      clientName: 'AgroTec Ltda',
      date: DateTime.now().subtract(const Duration(days: 5)),
      cropType: 'Milho',
      quantityTon: 89.0,
      storageLocation: 'Silo B',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Gestão de Safra')),
      floatingActionButton: FloatingActionButton(
        onPressed: () => context.push('/dashboard/harvest/new'),
        child: const Icon(Icons.add),
      ),
      body: _harvests.isEmpty
          ? const Center(child: Text('Nenhum registro de safra encontrado.'))
          : ListView.separated(
              padding: const EdgeInsets.all(16),
              itemCount: _harvests.length,
              separatorBuilder: (_, __) => const Divider(),
              itemBuilder: (context, index) {
                final harvest = _harvests[index];
                return ListTile(
                  leading: CircleAvatar(
                    backgroundColor: Colors.orange.shade100,
                    child: const Icon(Icons.agriculture, color: Colors.orange),
                  ),
                  title: Text(harvest.clientName),
                  subtitle: Text(
                    '${harvest.cropType} • ${DateFormat('dd/MM/yyyy').format(harvest.date)}',
                  ),
                  trailing: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text(
                        '${harvest.quantityTon.toStringAsFixed(1)} ton',
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      Text(
                        harvest.storageLocation,
                        style: const TextStyle(
                          fontSize: 12,
                          color: Colors.grey,
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
    );
  }
}
