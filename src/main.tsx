import { createRoot } from 'react-dom/client'
import GlobalStyles from  "../GlobalStyles";
import AppRoutes from "../routes";

createRoot(document.getElementById('root')!).render(
    <>
        <GlobalStyles />
        <AppRoutes />
    </>


)
