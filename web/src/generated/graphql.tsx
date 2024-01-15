import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: User;
  login: User
};


export type MutationRegisterArgs = {
  input: UserInput;
};

export type MutationLoginArgs = {
  input: UserLogin;
};

export type Query = {
  __typename?: 'Query';
  getByUsername?: Maybe<User>;
};


export type QueryGetByUsernameArgs = {
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  updatedAt: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type UserLogin = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterMutationVariables = Exact<{
  input: UserInput;
}>;

export type LoginMutationVariables = Exact<{
  input: UserLogin;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', email: string, username: string, firstName: string, lastName: string, createdAt: string, updatedAt: string } };

export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', email: string, username: string, firstName: string, lastName: string, password: string, createdAt: string, updatedAt: string } };

export type GetByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetByUsernameQuery = { __typename?: 'Query', getByUsername?: { __typename?: 'User', id: number, username: string, email: string, firstName: string, lastName: string, createdAt: string, updatedAt: string } | null };


export const RegisterDocument = gql`
    mutation Register($input: UserInput!) {
  register(input: $input) {
    email
    username
    firstName
    lastName
    password
    createdAt
    updatedAt
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};


export const LoginDocument = gql`
  mutation Login($input: UserLogin!) {
  login(input: $input) {
    id
    username
    email
    createdAt
    updatedAt
    password
  }
}
    `;
export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};

export const GetByUsernameDocument = gql`
    query GetByUsername($username: String!) {
  getByUsername(username: $username) {
    id
    username
    email
    firstName
    lastName
    createdAt
    updatedAt
  }
}
    `;

export function useGetByUsernameQuery(options: Omit<Urql.UseQueryArgs<GetByUsernameQueryVariables>, 'query'>) {
  return Urql.useQuery<GetByUsernameQuery>({ query: GetByUsernameDocument, ...options });
};