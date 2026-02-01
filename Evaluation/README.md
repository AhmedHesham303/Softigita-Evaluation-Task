🚀 Approach for Infinite Scroll Logic

I implemented infinite scrolling using the Intersection Observer API instead of a traditional scroll event listener.

Why Intersection Observer?

I didnt rely on ai to choose intersection observer but instaed i tried to build my own opinion so i read the docs of the intersection observer and why its bettere than evnt handler scrolling the better points where thst :
complex caluclatuins
may cause multiple network calls from the callback

🧩 Component API Design Decisions

While designing the components, I focused on separation of concerns and reusability.

Key decisions:

build it first in one componnet and created types for only this specifc endpoint then step by step started splitting logic from UI
by using custome fetch hook and make the list copmont to exept the jsx element and its data thriugh props tthe same for the list item component but passed as childrenn which allowed rendering any type of data

⚠️ Challenges Faced

Some of the main challenges during development included:

Managing difrent loading states(initial,more)

Preventing multiple API calls from firing at the same time.

the conflict between typing and making it reuasble at the same time

Correctly typing useRef for DOM elements and handling null safely.
build the threshold logic and specally for edge cases

🌐 Live Demo

🔗 Live Demo:
https://your-live-demo-link-here

📦 Repository

🔗 GitHub Repository:
https://github.com/AhmedHesham303/Softigita-Evaluation-Task/tree/main/Evaluation

🛠️ Tech Stack

React
TypeScript
Intersection Observer API
shadcn
