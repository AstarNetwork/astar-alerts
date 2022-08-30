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
        "address": "0x3d4DCFD2B483549527f7611ccFecb40b47d0c17b",
        "abi": ""
      }
    },
	"endpoints": [
		"wss://evm.astar.network"
	],
	// This is where you specify which reporters you want to use.
	"reporters": {
		// if provided, report all events to a slack channel.
		"slack": {
			"channel": "https://evm.astar.network",
		},

		// if provided, writes all reports to the file at the given path. The file is appended to
		"fs": {
			"path": "./out1.log"
		},

		// enabling this will print all reports to console as well.
		"console": {},
	}
}

```

## Deployment

Project is deployed as firebase serverless functions.

```
$ firebase deploy
```


