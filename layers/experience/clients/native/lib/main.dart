import 'package:flutter/material.dart';
import 'package:moult/features/onboarding/screens/landing.dart';

void main() {
  runApp(const App());
}

class App extends StatelessWidget {

  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'moult',
      home: Landing()
    );
  }
}
