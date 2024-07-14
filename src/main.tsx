import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import "@styles/global.css";
import "@styles/media.css";
import AppRouter from "@routes/AppRouter";
import { Provider } from "react-redux"
import { store } from "@store/store";
ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
