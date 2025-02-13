# Text Auto-complete with Ollama

## Overview

This project implements a text auto-complete feature using Ollama, providing a natural way to complete user input text. It leverages the **fetch API** to get completion suggestions based on the text input. As the user types, suggestions are displayed and dynamically updated based on the current text.

### Features:
- Text input field with live suggestions as the user types.
- The suggestion is fetched from an API and displayed in real-time.
- The new text added to the input appears in a light gray color, indicating it’s part of the suggestion.
- Auto-complete suggestions are integrated directly into the same text input, making the user experience seamless.
- The input field dynamically adjusts its width to be twice the width of the `<h1>` text for consistency.

## Demo

Visit [your live demo URL] to see the auto-complete feature in action.

## Installation

To run the project locally, follow the steps below:

### Prerequisites:
- A web server (or you can use simple server setups like `Live Server` extension for VSCode).
- Node.js (if you're running this as part of a more extensive backend project).

### Steps:
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/auto-autocomplete-ai.git
    ```
   
2. Navigate into the project directory:
    ```bash
    cd auto-autocomplete-ai
    ```

3. Open the `index.html` in your browser to view the demo.

4. Optionally, you can serve the project using a local server, like `Live Server` in VSCode, to see real-time changes.

5. Install the dependencies `npm install`

6. Serve the project `npm run dev`

## File Structure

```plaintext
auto-autocomplete-ai/
├── index.html           # Main HTML file with the structure
├── src/
│   ├── style.css        # Styling for the input field, suggestion box, and layout
│   └── main.js          # JavaScript code for fetching suggestions and handling input
└── README.md            # Project documentation
