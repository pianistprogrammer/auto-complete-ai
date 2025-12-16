const INPUT_DELAY = 600; // Delay in milliseconds before sending the input to the model
const PROMPT_TEMPLATE = `### Task:
You are an autocompletion system. Continue the text in \`<text>\` up to 8 words based on the **completion type** in \`<type>\` and the given language.  
### **Instructions**:
1. Analyze \`<text>\` for context and meaning.  
2. Use \`<type>\` to guide your output:  
   - **General**: Provide a natural, concise continuation.  
   - **Search Query**: Complete as if generating a realistic search query.  
3. Start as if you are directly continuing \`<text>\`. Do **not** repeat, paraphrase, or respond as a model. Simply complete the text.  
4. Ensure the continuation:
   - Flows naturally from \`<text>\`.  
   - Avoids repetition, overexplaining, or unrelated ideas.  
5. If unsure, return: \`{ "text": "" }\`.  
### **Output Rules**:
- Respond only up to 8 words in JSON format: \`{ "text": "<your_completion>" }\`.

### **Examples**:
#### Example 1:  
Input:  
<type>General</type>  
<text>The sun was setting over the horizon, painting the sky</text>  
Output:  
{ "text": "with vibrant shades of orange and pink." }

#### Example 2:  
Input:  
<type>Search Query</type>  
<text>Top-rated restaurants in</text>  
Output:  
{ "text": "New York City for Italian cuisine." }  

### Context:
<type>General</type>  
<text>{{TEXT}}</text>  
#### Output:`;

async function getCompletion(text) {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama3.2:latest',
                messages: [{
                    role: 'user',
                    content: PROMPT_TEMPLATE.replace('{{TEXT}}', text)
                }],
                stream: false
            })
        });

        const data = await response.json();
        try {
            const completion = JSON.parse(data.message.content);
            return completion.text || '';
        } catch (e) {
            console.error('Failed to parse completion:', e);
            return '';
        }
    } catch (error) {
        console.error('Error getting completion:', error);
        return '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.getElementById('userInput');
    const suggestionElement = document.getElementById('suggestion');
    const headingElement = document.querySelector('h1');

    function adjustInputWidth() {
        const headingWidth = headingElement.offsetWidth;
        inputElement.style.width = `${headingWidth * 1.4}px`; // 200% of h1 width
    }

    let typingTimer;

    async function handleInput() {
        const text = inputElement.value;
        if (text.trim()) {
            const completion = await getCompletion(text);
            if (completion) {
                // Add a space before completion only if needed
                const needsSpace = !text.endsWith(' ') && !completion.startsWith(' ');
                const suggestion = needsSpace ? ' ' + completion : completion;
                
                // Save the current cursor position
                const cursorPosition = inputElement.selectionStart;
                
                // Set the suggested text as part of the input value
                inputElement.setRangeText(
                    suggestion, 
                    cursorPosition, 
                    inputElement.value.length, 
                    'end'
                );
                
                // Highlight the suggested text
                inputElement.setSelectionRange(cursorPosition, inputElement.value.length);
            }
        }
        else inputElement.value = '';
    }
    
    inputElement.addEventListener('input', (e) => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(handleInput, INPUT_DELAY);
    });

    inputElement.addEventListener('keydown', () => {
        clearTimeout(typingTimer);
    });

    // Sync styles between input and suggestion
    function syncStyles() {
        const inputStyle = window.getComputedStyle(inputElement);
        suggestionElement.style.fontFamily = inputStyle.fontFamily;
        suggestionElement.style.fontSize = inputStyle.fontSize;
        suggestionElement.style.padding = inputStyle.padding;
        suggestionElement.style.boxSizing = inputStyle.boxSizing;
        suggestionElement.style.lineHeight = inputStyle.lineHeight;
        suggestionElement.style.width = `${inputElement.offsetWidth}px`;
    }

    syncStyles();
    adjustInputWidth();

    inputElement.addEventListener('input', syncStyles);
    window.addEventListener('resize', syncStyles);
    window.addEventListener('resize', adjustInputWidth);
});
