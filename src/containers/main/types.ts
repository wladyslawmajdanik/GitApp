export interface Repository {
  id:number,
  name:string
  owner:Owner
  stargazers_count:number
  html_url:string
}

export interface Owner {
  avatar_url:string
  login:string
}

export interface InputState {
  inputText? :string
  errorMessage?:string;
  network:InputNetworkState;
}

export enum InputNetworkState {
  ERROR,
  LOADING,
  NONE
}