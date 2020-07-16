import BackgroundComponent from "../src/components/BackgroundComponent";
import HeaderComponent from "../src/components/HeaderComponent";
import AboutComponent from "../src/components/AboutComponent";

function About() {
  return (
    <BackgroundComponent>
      <HeaderComponent />
      <AboutComponent />
    </BackgroundComponent>
  );
}
export default About;
