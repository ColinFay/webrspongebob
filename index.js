const path = require('path');
const { WebR } = require('webr');
const { loadPackages, LibraryFromLocalFolder, Library } = require('spidyr');

const rfuns = new LibraryFromLocalFolder("rfuns");
const spongebob = new Library("spongebob");

(async () => {

  console.log("👉 Loading WebR ----");
  globalThis.webR = new WebR();
  await globalThis.webR.init();

  console.log("👉 Loading R packages ----");

  await loadPackages(
    globalThis.webR,
    path.join(__dirname, 'webr_packages')
  )

  await rfuns.mountAndLoad(
    globalThis.webR,
    path.join(__dirname, 'rfuns')
  );

  await spongebob.load(
    globalThis.webR
  );

  const hw = await rfuns.hello_world()

  console.log(hw.values);

  const said = await spongebob.tospongebob("hello from spongebob")

  console.log(said.values)

  console.log("✅ Everything is ready!");;

})();