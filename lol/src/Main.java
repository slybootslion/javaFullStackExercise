import reflect.ISkill;
import reflect.HeroFactory;

import java.util.Scanner;

public class Main {
    // awkward
/*    public static void main(String[] args) {
        String name = Main.getPlayerInput();
        switch (name) {
            case "Diana":
                Diana diana = new Diana();
                diana.q();
                break;
            case "Irelia":
                Irelia irelia = new Irelia();
                irelia.q();
                break;
            case "Camille":
                Camille camille = new Camille();
                camille.q();
                break;
        }
    }*/


    // abstraction
    /*public static void main(String[] args) throws Exception {
        String name = Main.getPlayerInput();
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
        iSkill.q();
    }*/

    // factory\reflect
    public static void main(String[] args) throws Exception {
        String name = Main.getPlayerInput();
        ISkill iSkill = HeroFactory.getHero(name);
        iSkill.q();
    }

    private static String getPlayerInput() {
        System.out.println("enter hero name:");
        Scanner s = new Scanner(System.in);
        return s.nextLine();
    }
}
