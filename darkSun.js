// Define configureSystem function globally so it can be reused
const configureSystem = (configPath, removals = [], additions = {}) => {
  const baseConfig = foundry.utils.deepClone(configPath);
  console.log(baseConfig);
  removals.forEach((key) => delete baseConfig[key]);
  return foundry.utils.mergeObject(baseConfig, additions);
};

Hooks.on("init", () => {
  // Configure currencies - remove ep and add Dark Sun currencies
  CONFIG.DND5E.currencies = configureSystem(
    CONFIG.DND5E.currencies,
    ["ep"], // items to remove
    {
      gp: {
        abbreviation: "gp",
        conversion: 100,
        icon: "systems/dnd5e/icons/currency/gold.webp",
        label: "Gold",
      },
      sp: {
        abbreviation: "sp",
        conversion: 10,
        icon: "systems/dnd5e/icons/currency/silver.webp",
        label: "Silver",
      },
      ct: {
        abbreviation: "ct",
        conversion: 1,
        icon: "systems/dnd5e/icons/currency/electrum.webp",
        label: "Ceramic Token",
      },
      cb: {
        abbreviation: "cb",
        conversion: 10,
        icon: "systems/dnd5e/icons/currency/platinum.webp",
        label: "Ceramic Bit",
      },
      lb: {
        abbreviation: "lb",
        conversion: 100,
        icon: "systems/dnd5e/icons/currency/copper.webp",
        label: "Lead Bead",
      },
    }
  );

  // Configure item properties for Dark Sun materials
  CONFIG.DND5E.itemProperties = configureSystem(
    CONFIG.DND5E.itemProperties,
    [], // items to remove
    {
      bne: {
        label: "Bone",
        isPhysical: true,
      },
      met: {
        label: "Metal",
        isPhysical: true,
      },
      obs: {
        label: "Obsidian",
        isPhysical: true,
      },
      wod: {
        label: "Wood",
        isPhysical: true,
      },
      stn: {
        label: "Stone",
        isPhysical: true,
      },
      psi: {
        abbreviation: "P",
        label: "Psionic",
      },
    }
  );

  CONFIG.DND5E.spellSchools = configureSystem(
    CONFIG.DND5E.spellSchools,
    [], // items to remove
    {
      psi: {
        label: "Psionic",
        icon: "icons/magic/perception/third-eye-blue-red.webp",
        fullKey: "psionic",
        reference:
          "Compendium.world.the-talent-and-psionics.JournalEntry.UCLC4zhkaR8mAsJg",
      },
    }
  );

  // Add new properties to valid property sets
  CONFIG.DND5E.validProperties.weapon.add("bne");
  CONFIG.DND5E.validProperties.weapon.add("met");
  CONFIG.DND5E.validProperties.weapon.add("obs");
  CONFIG.DND5E.validProperties.weapon.add("wod");
  CONFIG.DND5E.validProperties.weapon.add("stn");
  CONFIG.DND5E.validProperties.equipment.add("met");
  CONFIG.DND5E.validProperties.spell.add("psi");

  // TODO: Language configuration - needs proper implementation
  // The commented language configuration appears incomplete and would need
  // proper structure to work with DND5E's language system

  CONFIG.DND5E.languages = configureSystem(
    CONFIG.DND5E.languages.standard.children,
    ["gnomish", "goblin", "orc"],
    {}
  );
  // CONFIG.DND5E.languages = configureSystem(
  //   CONFIG.DND5E.languages.exotic.children,
  //   [
  //     "celestial",
  //     "gith",
  //     "gnoll",
  //     "infernal",
  //     "otyugh",
  //     "timeRaider",
  //     "angulotl",
  //   ],
  //   {}
  //   // {
  //   //   beholder: "Beholder",
  //   //   loross: "Loross",
  //   //   scro: "Scro",
  //   // }
  // );
});
