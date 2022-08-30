# Astar Alerts 🔴 📣

A *dead-simple*, yet *highly **effective*** notification system for astar.

## Configuration

You need to provide one configuration file to the program, which specifies:


1. which tokens you want to monitor.
2. which reporters you want to use.

These configurations can be provided either as JSON

```javascript
{
    {
      "arsw": {
        "address": "0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720",
        "abi": []
      }
    },
	"endpoints": [
		"wss://evm.astar.network"
	],
	// This is where you specify which reporters you want to use.
	"reporters": {
		// if provided, report all events to a slack channel.
		"slack": {
			"channel": "2_network_token_alerts",
		},

		// enabling this will print all reports to console as well.
		"console": true,
	}
}

```

## Deployment

Project is deployed as firebase serverless functions.

```
$ firebase deploy
```


