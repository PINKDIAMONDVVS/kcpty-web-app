/* Storefront API customerCreate — used by the newsletter form to register
 * a marketing-opted-in customer. The Shopify Storefront API requires a
 * password on this mutation; we generate a strong random one server-side
 * and never expose it. The customer can later use the "forgot password"
 * flow if they ever want to log in. */
export const customerCreateMutation = /* GraphQL */ `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export type CustomerCreateOperation = {
  data: {
    customerCreate: {
      customer: { id: string; email: string } | null;
      customerUserErrors: {
        code: string;
        field: string[] | null;
        message: string;
      }[];
    };
  };
  variables: {
    input: {
      email: string;
      password: string;
      acceptsMarketing?: boolean;
    };
  };
};
