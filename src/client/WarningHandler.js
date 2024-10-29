class WarningHandler {
    #warnings;
    #consoleEnabled;

    constructor(options = {}) {
        this.#warnings = [];
        this.#consoleEnabled = options.console !== false;
    }

    warn(source, message) {
        const formattedMessage = `[${source}] ${message}`;
        const warning = {
            source,
            message: formattedMessage,
            timestamp: new Date()
        };

        this.#warnings.push(warning);

        if (this.#consoleEnabled) {
            console.warn(formattedMessage);
        }
    }

    getWarnings() {
        return [...this.#warnings];
    }

    clearWarnings() {
        this.warnings = [];
    }

    hasWarnings() {
        return this.#warnings.length > 0;
    }

    setConsoleOutput(enabled) {
        this.#consoleEnabled = enabled;
    }

}

export { WarningHandler };
