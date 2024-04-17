# V-Music

## Installation
To install V-Music and its dependencies, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install all required dependencies.

## Usage
To start V-Music, run the following command:

```bash
npm start
```

This will initiate the Discord Bot.

## Testing
V-Music utilizes Jest for testing purposes. To run the tests, execute the following command:

```bash
npm test
```

This command will run Jest with options to force exit after tests are completed and output the results in JSON format to a file named jest-report.json.

## Configuration
V-Music utilizes environment variables for configuration. Before starting the application, make sure to create a `.env` file in the project root directory and define the `TOKEN` and `PREFIX` variable.

```
TOKEN=[here]
PREFIX=v!
```

## License
See the [LICENSE](LICENSE) file for details.