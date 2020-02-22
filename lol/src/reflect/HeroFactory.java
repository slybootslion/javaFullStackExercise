package reflect;

public class HeroFactory {
    public static ISkill getHero(String name) throws Exception {
        ISkill iSkill;

        String className = "reflect.hero." + name;
        Class<?> cla = Class.forName(className);
        Object obj = cla.newInstance();
        return (ISkill) obj;
//        return iSkill;
    }
}
