export class RegexExpressions {
  public static readonly EMAIL = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  // eslint-disable-next-line max-len
  public static readonly PASSWORD = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){5,40}$/;
  public static readonly TEXT = /^([a-zA-ZñÀ-ú]+(\s?[a-zA-ZñÀ-ú])){2,20}$/;
}
