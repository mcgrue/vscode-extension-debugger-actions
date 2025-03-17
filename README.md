# Breakpoint Webhooks

Send HTTP requests whenever a breakpoint is hit during debugging. Useful for triggering external actions or notifications when specific code paths are executed.

## Features

- Automatically sends HTTP requests when breakpoints are hit during debugging
- Configurable webhook URL
- Works with any programming language or debugger in VS Code
- Real-time logging of webhook activity
- Zero configuration needed beyond webhook URL

![Feature Preview](images/feature-preview.gif)

## Requirements

- Visual Studio Code 1.80.0 or newer
- A publicly accessible webhook URL to receive the requests

## Extension Settings

This extension contributes the following setting:

* `breakpointWebhook.webhookUrl`: Webhook URL to send breakpoint notifications

## Setup

1. Install the extension
2. Open VS Code Settings (File > Preferences > Settings)
3. Search for "Breakpoint Webhook"
4. Enter your webhook URL in the `breakpointWebhook.webhookUrl` setting
5. Start debugging your application

The extension will automatically begin sending requests to your webhook URL whenever a breakpoint is hit.

## Example Usage

### Basic Setup
```jsonc
// settings.json
{
    "breakpointWebhook.webhookUrl": "https://your-webhook.example.com/endpoint"
}
```

### Sample Webhook Payload
```json
{
    "event": "breakpointHit",
    "threadId": "12345",
    "timestamp": "2023-12-14T12:00:00Z"
}
```

## Common Use Cases

- Trigger CI/CD pipelines when specific code paths are executed
- Send Slack/Discord notifications on critical breakpoints
- Log debugging sessions to external monitoring systems
- Automate actions based on code execution patterns

## Known Issues

- Webhook requests may timeout if the endpoint is slow to respond
- Currently only supports GET requests

## Release Notes

### 0.0.1

Initial release of Breakpoint Webhooks:
- Basic webhook functionality
- Configurable webhook URL
- Debug session monitoring

## Contributing

Found a bug or have a feature request? Please open an issue on our [GitHub repository](https://github.com/yourusername/vscode-extension-debugger-actions).

## License

This extension is licensed under the [MIT License](LICENSE).


