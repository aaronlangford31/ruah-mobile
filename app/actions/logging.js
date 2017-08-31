export function info(content) {
  return {
    type: 'DEV_LOG_INFO',
    content,
  };
}

export function warn(content) {
  return {
    type: 'DEV_LOG_WARN',
    content,
  };
}

export function error(content) {
  return {
    type: 'DEV_LOG_ERR',
    content,
  };
}
