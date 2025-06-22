import { Page } from "@playwright/test";
import { session } from "./mocksResponses";

export const mockAuthentication = async (page: Page) => {
    await page.context().addCookies([{
      name: 'session',
      value: JSON.stringify(session),
      domain: 'localhost',
      path: '/',
      httpOnly: false,
      secure: true
    }]);
}
