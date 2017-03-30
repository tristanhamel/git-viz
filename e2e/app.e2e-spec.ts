import { GithubVizPage } from './app.po';

describe('github-viz App', () => {
  let page: GithubVizPage;

  beforeEach(() => {
    page = new GithubVizPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
