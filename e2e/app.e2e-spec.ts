import { EcoachPage } from './app.po';

describe('ecoach App', () => {
  let page: EcoachPage;

  beforeEach(() => {
    page = new EcoachPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
