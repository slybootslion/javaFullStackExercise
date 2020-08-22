package factory;

import factory.hero.Camille;
import factory.hero.Diana;
import factory.hero.Irelia;

public class HeroFactory {
    public static ISkill getHero(String name) throws Exception {
        ISkill iSkill;
        switch (name) {
            case "Diana":
                iSkill = new Diana();
                break;
            case "Irelia":
                iSkill = new Irelia();
                break;
            case "Camille":
                iSkill = new Camille();
                break;
            default:
                throw new Exception();
        }
        return iSkill;
    }
}
