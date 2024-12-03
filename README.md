# FitFusion Client 🚀

Welcome to **FitFusion Client** — the front-end companion to your fitness journey! This is where the magic happens on the user side. Whether you're looking for workout plans, personalized diet suggestions, or real-time communication with trainers, FitFusion Client has it all.

Built with **React**, **Redux**, and a blend of **Bootstrap**, **MUI**, **Formik**, and **Framer Motion**, this client app connects seamlessly to the FitFusion Server to bring your fitness goals to life. 💪

Check it out live: [FitFusion Client](https://fitfusion-client.vercel.app/)

## 🌟 Features

- **User Dashboard**: Access personalized workout plans, diet recommendations, and more.
- **Trainer Interaction**: Real-time chat and video calls with trainers powered by **WebSockets** and **WebRTC**.
- **Subscriptions**: Easily manage your subscriptions and payments through **Stripe**.
- **Authentication**: Sign up and log in securely using **Google OAuth** or traditional email/password authentication.
- **Notifications**: Get notified instantly about any updates, messages, or new content related to your fitness journey.
- **Profile Management**: Update your profile and set your fitness goals.
- **Video Filtering**: Search, filter, and sort through fitness videos for easy access to relevant content.

## 🛠️ Technologies & Tools

- **Frontend Framework**: React.js
- **State Management**: Redux for state handling
- **Routing**: React Router for smooth navigation
- **Authentication**: Google OAuth + JWT for secure authentication
- **UI Library**: Bootstrap, MUI for modern UI components
- **Form Management**: Formik for easy form handling
- **Motion Effects**: Framer Motion for smooth animations
- **Real-Time Communication**: WebSockets + WebRTC for instant chat and video calls
- **Payment Gateway**: Stripe for managing subscriptions and payments
- **Environment Management**: `.env` configuration for sensitive data like API keys

## 📁 Project Structure

Here’s a look at how the client-side code is organized:

```
fitfusion-client/
│
├── src/
│   ├── assets/           # Images, icons, and other static files
│   ├── components/       # Reusable UI components like buttons, cards, etc.
│   ├── config/           # Configuration files for app settings
│   ├── context/          # Context for managing global state
│   ├── pages/            # Pages like Dashboard, Profile, Trainer, etc.
│   ├── redux/            # Redux state management (actions, reducers, store)
│   ├── App.jsx           # Main app entry point
│   ├── main.jsx          # Application entry point (renders the app)
│
├── .env                  # Environment variables (API URLs, keys, etc.)
├── package.json          # Dependencies, scripts, and project configuration
└── README.md             # This file!
```

## 🤝 Contributing

Want to contribute to FitFusion Client? Awesome! We welcome contributions of all kinds, whether it's bug fixes, new features, or documentation improvements.

Here’s how you can help:
- Fork the repository
- Create a new branch (`git checkout -b feature-branch`)
- Commit your changes (`git commit -am 'Add new feature'`)
- Push to your branch (`git push origin feature-branch`)
- Create a pull request!

Let’s work together to make FitFusion even better!

## 👨‍💻 Author

Made with 💖 by **Ananthu Mohan**  
Let’s connect! [GitHub](https://github.com/AnanthuSpace)

---

Thank you for checking out **FitFusion Client**. I’m excited for you to join the fitness adventure! 🌟

If you love what you see, don’t forget to give me a star ⭐. It keeps me motivated to build more awesome features!

