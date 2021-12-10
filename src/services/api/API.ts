import { BASIC_KEY } from '../../config/config';

export const Header = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const HeaderLogin = {
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded',
  Authorization: 'Basic ' + BASIC_KEY,
};

export const HeaderAuth = (token: string) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

export const POST_LOGIN = async (
  url: string,
  body: any,
  header = Header
): Promise<any> => {
  try {
    const parseBody = JSON.stringify(body);
    const res = await fetch(url, {
      method: 'POST',
      headers: header,
      body: parseBody,
      credentials: 'include',
    });
    return {
      status: res.status,
      res: await res.json(),
    };
  } catch (err) {
    throw err;
  }
};

export const POST = async (
  url: string,
  body: object,
  header = Header
): Promise<any> => {
  const parseBody = JSON.stringify(body);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: header,
      body: parseBody,
      credentials: 'include',
    });
    return {
      status: res.status,
      res: await res.json(),
    };
  } catch (err) {
    throw err;
  }
};

export const POST_DOWNLOAD = async (
  url: string,
  params: any = {},
  header = Header
) => {

  const parseBody = JSON.stringify(params);
  return await fetch(url, {
    method: 'POST',
    headers: header,
    credentials: 'include',
    body: parseBody
  })
    .then((response) => {
      // console.log(response);
      // response.body?.getReader();
      return response.blob();
    })
    .then((blob) => {
      function showInOtherTab(blob: any) {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      }

      showInOtherTab(blob);
    })
    .catch((error) => {
      throw error;
    });
};

export const PATCH = async (
  url: string,
  body: object,
  header = Header
): Promise<any> => {
  const parseBody = JSON.stringify(body);
  try {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: header,
      body: parseBody,
      credentials: 'include',
    });
    return {
      status: res.status,
      res: await res.json(),
    };
  } catch (err) {
    throw err;
  }
};

export const GET = async (
  url: string,
  params: any = {},
  header = Header
): Promise<any> => {
  try {
    const fetchUrl = new URL(url);
    Object.keys(params).forEach((key) =>
      fetchUrl.searchParams.append(key, params[key])
    );

    const res = await fetch(fetchUrl.href, {
      method: 'GET',
      headers: header,
      credentials: 'include',
    });
    return {
      status: res.status,
      res: await res.json(),
    };
  } catch (err) {
    throw err;
  }
};
