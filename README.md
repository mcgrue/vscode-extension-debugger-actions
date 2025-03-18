# Breakpoint Webhooks

Send HTTP requests whenever a breakpoint is hit during debugging. Useful for triggering external actions or notifications.

## Features

- Automatically sends HTTP requests when breakpoints are hit during debugging
- Configurable webhook URL
- Works with any programming language or debugger in VS Code
- Real-time logging of webhook activity
- Zero configuration needed beyond webhook URL

## Demo Video

Watch a quick demo of the Breakpoint Webhooks extension in action:

[![Breakpoint Webhooks Demo](https://img.youtube.com/vi/sT03Hrv72

## Requirements

- Visual Studio Code 1.80.0 or newer
- A publicly accessible webhook URL to receive the requests

## Extension Settings

This extension contributes the following setting:

* `breakpointWebhook.webhookUrl`: Webhook URL to send breakpoint notifications.  Use wisely
* `breakpointWebhook.verbose`: Enable verbose logging for debugging (goes to the output window in the "Breakpoint Webhooks" channel)

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

- Trigger sounds or notifications when breakpoints are hit (useful for long running processes that you don't know when you'll hit the breakpoint and  you're getting distracted by reddit...)
- Look, I just missed the old MSVC++ system-level configurable debugger sounds

## Known Issues

- Webhook requests may timeout if the endpoint is slow to respond
- Currently only supports GET requests

## Release Notes

### 0.0.2

Initial release of Breakpoint Webhooks:
- Basic webhook functionality
- Configurable webhook URL
- Debug session monitoring

## Contributing

Found a bug or have a feature request? Please open an issue on our [GitHub repository](https://github.com/mcgrue/vscode-extension-debugger-actions/issues).

## License

This extension is licensed under the [MIT License](LICENSE).


