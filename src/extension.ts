import * as vscode from "vscode";

function verboseLog(outputChannel: vscode.OutputChannel, log: string) {
	const config = vscode.workspace.getConfiguration("breakpointWebhook");
	const verbose = config.get<string>("verbose");
	if (verbose) {
		outputChannel.appendLine(`debuggerWebhook: ${log}`);
		outputChannel.show();
	}
}

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

	verboseLog(
		outputChannel,
		`Breakpoint Webhooks is now active. Will GET ${webhookUrl} on breakpoint hits.`,
	);

	// Start listening for debug events immediately
	const debugListener = vscode.debug.onDidChangeActiveStackItem(async (e) => {
		// return early if no active stack item
		if (!e) {
			return;
		}

		// Prepare the event data
		const eventData = {
			event: "breakpointHit",
			threadId: e?.threadId,
			timestamp: new Date().toISOString(),
		};

		// Encode the data for GET request
		const queryParams = encodeURIComponent(JSON.stringify(eventData));
		const requestUrl = `${webhookUrl}?data=${queryParams}`;

		try {
			outputChannel.appendLine(`GET: ${requestUrl}`);
			outputChannel.show();

			// Send the GET request using fetch
			const response = await fetch(requestUrl);
			verboseLog(outputChannel, `Webhook response status: ${response.status}`);
		} catch (error: any) {
			verboseLog(outputChannel, `Webhook error: ${error.message}`);
		}
	});

	// Add the listener to subscriptions so it gets cleaned up on deactivation
	context.subscriptions.push(debugListener);
}

export function deactivate() {}
