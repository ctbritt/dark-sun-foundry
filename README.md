# Dark Sun Foundry VTT Module

A Foundry VTT module that adapts the D&D 5e system for Dark Sun campaign settings.

## Features

### Currency System
- Replaces standard D&D currency with Dark Sun specific currencies:
  - **Gold (gp)**: 100 conversion rate
  - **Silver (sp)**: 10 conversion rate  
  - **Ceramic Token (ct)**: Base currency (1 conversion rate)
  - **Ceramic Bit (cb)**: 10 conversion rate
  - **Lead Bead (lb)**: 100 conversion rate

### Material Properties
Adds Dark Sun specific material properties for weapons and equipment:
- **Bone (bne)**: Physical material property
- **Metal (met)**: Physical material property
- **Obsidian (obs)**: Physical material property
- **Wood (wod)**: Physical material property
- **Stone (stn)**: Physical material property
- **Psionic (psi)**: Non-physical property for psionic items

### Spell Schools
- Adds **Psionic** spell school for psionic abilities and spells

### Language Configuration
- Removes standard D&D languages that don't fit the Dark Sun setting:
  - Gnomish
  - Goblin
  - Orc

## Installation

1. Download this module
2. Extract the files to your Foundry VTT `modules` directory
3. Enable the module in your Foundry VTT world settings
4. Ensure you have the D&D 5e system installed and active

## Compatibility

- **Foundry VTT**: Version 12+ (verified for 13)
- **System**: D&D 5e
- **Module Dependencies**: None

## Usage

Once installed and enabled, the module will automatically:
- Configure the currency system for Dark Sun
- Add material properties to weapons and equipment
- Enable psionic spell school
- Adjust language options

## Development

This module uses Foundry VTT's hook system to modify the D&D 5e configuration. The main functionality is in `darkSun.js`.

### Structure
- `module.json`: Module manifest and metadata
- `darkSun.js`: Main module functionality
- `.gitattributes`: Git configuration for binary files
- `scripts/release.js`: Release management script
- `.github/workflows/`: GitHub Actions workflows

### Release Process

To create a new release:

1. **Update version**: `npm run version 1.1.0`
2. **Prepare release**: `npm run release 1.1.0`
3. **Commit changes**: `git add . && git commit -m "Release v1.1.0"`
4. **Push to GitHub**: `git push origin master`
5. **Create GitHub release**: Go to GitHub and create a new release with tag `v1.1.0`
6. **Upload files**: Upload the generated zip file to the GitHub release

The GitHub Actions workflow will automatically:
- Validate the module structure
- Create release assets
- Update manifest URLs for Foundry VTT installation

## License

This module is provided as-is for use with Foundry VTT.

## Contributing

Feel free to submit issues or pull requests to improve this module for the Dark Sun community. 