# SuiLenz

> **High-Fidelity Transaction Explainer for the Sui Network.**

SuiLenz is a next-generation block explorer and transaction analysis tool designed specifically for the detailed object-centric model of Sui. It translates complex on-chain data into human-readable narratives and visual flowcharts using Mermaid.js.

![SuiLenz Preview](https://suilenz.vercel.app/)

## ✨ Features

- **Human-Readable Narratives**: Automatically generates a plain English summary of what happened in a transaction (e.g., "Swapped 10 SUI for 450 USDC on Cetus").
- **Visual Flowcharts**: Renders transaction logic and object flows as interactive diagrams using **Mermaid.js**.
- **Detailed Rundowns**: breakdowns of gas usage, assets involved, initiators, and contract calls.
- **Developer CLI Integration**: Seamlessly switch between the web interface and the `@suilenz/cli` tool.
- **Dark Mode First**: A premium, developer-centric UI designed for extended use.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jes-labs/sui-transaction-explainer-frontend.git
   cd suilenz
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
