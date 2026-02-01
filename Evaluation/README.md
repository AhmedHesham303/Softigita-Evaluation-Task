🚀 Approach for Infinite Scroll Logic

I implemented infinite scrolling using the Intersection Observer API instead of a traditional scroll event listener.

Why Intersection Observer?

I didn’t rely on AI to choose the Intersection Observer. Instead, I tried to build my own opinion by reading the official documentation and understanding why it is better than scroll event handlers.
The main issues with scroll event handling were:

Complex calculations

Possibility of triggering multiple network calls from the callback

🧩 Component API Design Decisions

While designing the components, I focused on separation of concerns and reusability.

Key decisions:

I first built everything in a single component and created types for only this specific endpoint.

Step by step, I started splitting logic from UI.

I introduced a custom fetch hook.

I designed the list component to accept the JSX element and its data through props.

The same approach was applied to the list item component, but it was passed as children, which allowed rendering any type of data.

⚠️ Challenges Faced

Some of the main challenges during development included:

Managing different loading states (initial load, load more).

Preventing multiple API calls from firing at the same time.

Handling the conflict between strong typing and making components reusable.

Correctly typing useRef for DOM elements and safely handling null.

Building the threshold logic, especially for edge cases.

🌐 Live Demo

🔗 Live Demo:
https://github.com/AhmedHesham303/Softigita-Evaluation-Task/tree/main/Evaluation

📦 Repository

🔗 GitHub Repository:
https://github.com/AhmedHesham303/Softigita-Evaluation-Task/tree/main/Evaluation

🛠️ Tech Stack

React
TypeScript
Intersection Observer API
shadcn
