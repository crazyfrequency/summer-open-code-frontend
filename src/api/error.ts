import { AxiosResponse } from 'axios'

export const errorCatch = (error: any): string => {
  const message = error?.response?.data?.message

  return message
    ? typeof error.response.data.message === 'object'
      ? message[0]
      : message
    : error.message
}

const codes: Record<number, string> = {
  400: 'Некорректные данные в запросе',
  401: 'Ошибка авторизации',
  403: 'Доступ запрещен',
  404: 'Данные не найдены',
  409: 'Конфликт существующих данных',
  422: 'Некорректные данные в запросе',
  429: 'Слишком много запросов',
  500: 'Внутренняя ошибка сервера',
  502: 'Внутренняя ошибка сервера',
  503: 'Сервис недоступен',
  504: 'Внутренняя ошибка сервера',
}

const error_codes: Record<string, string> = {
  'ERR_FR_TOO_MANY_REDIRECTS': 'Слишком много перенаправлений',
  'ERR_BAD_OPTION_VALUE': 'Было указано неправильное значение опции. Возможно, разработчики где-то ошиблись...',
  'ERR_BAD_OPTION': 'Было указано неправильное имя опции. Возможно, разработчики где-то ошиблись...',
  'ERR_NETWORK': 'Сервер недоступен',
  'ERR_DEPRECATED': 'Используемый метод в запросе устарел',
  'ERR_BAD_RESPONSE': 'Некорректный ответ от сервера',
  'ERR_BAD_REQUEST': 'Неправильный запрос',
  'ERR_NOT_SUPPORT': 'Метод, используемый в запросе, не поддерживается. Возможно, браузер не поддерживается',
  'ERR_INVALID_URL': 'Неправильный URL. Возможно, разработчики где-то ошиблись',
  'ERR_CANCELED': 'Запрос был отменён',
  'ECONNABORTED': 'Возможно, превышено время ожидания',
  'ETIMEDOUT': 'Превышено время ожидания'
};

export type TCheckErrorResult = {
  ok: true,
  code: number,
} | {
  ok: false,
  code: number,
  message: string,
}

export function checkErrorMessage(response: Partial<AxiosResponse>|null): TCheckErrorResult {
  if (typeof response?.status === 'number') {
    if ( ~~(response.status / 100) === 2) {
      return { ok: true, code: response.status }
    }
    if (codes[response.status]) {
      return { ok: false, code: response.status, message: codes[response.status] }
    }
    return { ok: false, code: response.status, message: 'Непонятная ошибка' }
  }

  const message = response?.data?.message

  const description = message
      ? typeof message === 'object'
        ? message[0]
        : message
      : typeof response?.statusText === 'string'
        ? response.statusText
        : typeof response?.status === 'number'
      ? `Код ошибки: ${response?.status}`
      : null;

  if (description)
    return {
      ok: false,
      code: response?.status ?? -1,
      message: description
    }

  const error: any = response;

  return {
    ok: false,
    code: response?.status ?? -1,
    message: error_codes[error?.code] ?? error?.message ?? 'Непонятная ошибка',
  }
}
