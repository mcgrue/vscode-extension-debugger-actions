import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
	// Create output channel
	const outputChannel = vscode.window.createOutputChannel(
		"Breakpoint Webhooks",
	);

	// Get configuration
	const config = vscode.workspace.getConfiguration("breakpointWebhook");
	const webhookUrl = config.get<string>("webhookUrl");

	if (!webhookUrl) {
		outputChannel.appendLine(
			"Warning: Breakpoint Webhooks Extension will do nothing until you set breakpointWebhook.webhookUrl in your settings.json",
		);
		outputChannel.show();
		return;
	}

	outputChannel.show();
	outputChannel.appendLine(
		"Breakpoint Webhooks is now active.  Will ping ${webhookUrl} on breakpoint hits.",
	);

	// Start listening for debug events immediately
	const debugListener = vscode.debug.onDidChangeActiveStackItem((e) => {
		outputChannel.show();
		outputChannel.appendLine(`onDidChangeActiveStackItem! ${e?.threadId}`);
	});

	// Add the listener to subscriptions so it gets cleaned up on deactivation
	context.subscriptions.push(debugListener);
}

export function deactivate() {}
