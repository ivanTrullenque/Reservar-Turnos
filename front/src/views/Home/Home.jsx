import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={styles.homeContainer}>
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>Bienvenidos a CityBank</h1>
                <p className={styles.heroSubtitle}>Gestiona tus turnos de forma rápida y segura.</p>
            </section>

            <section className={styles.infoSection}>
                <h2>¿Por qué elegirnos?</h2>
                <p>En CityBank ofrecemos atención personalizada y los mejores servicios financieros para nuestros clientes. ¡Solicita tu turno en línea y ahorra tiempo!</p>
            </section>

            <section className={styles.featuresSection}>
                <h3>Nuestros Servicios</h3>
                <ul className={styles.featuresList}>
                    <li>Atención al cliente en sucursal</li>
                    <li>Asesoramiento financiero</li>
                    <li>Gestión de cuentas bancarias</li>
                    <li>Préstamos y créditos</li>
                    <li>Consultas sobre inversiones</li>
                </ul>
            </section>
        </div>
    );
};

export default Home;
