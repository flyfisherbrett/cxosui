import { CxosoftUiPage } from './app.po';

describe('cxosoft-ui App', function() {
  let page: CxosoftUiPage;

  beforeEach(() => {
    page = new CxosoftUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
