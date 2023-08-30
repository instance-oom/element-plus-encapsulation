export const INSTALLED_KEY = Symbol('INSTALLED_KEY');

export const makeInstaller = (components: Array<any> = []) => {

  const install = (app: any) => {
    if (app[INSTALLED_KEY]) return;
    app[INSTALLED_KEY] = true;
    components.forEach((c) => app.use(c));
  }

  return {
    install
  }
}
