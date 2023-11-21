import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";

// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/no-explicit-any
export async function loader({ params }: any) {
  const contact = await getContact(params.contactId);
  return { contact };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Favorite({ contact }: any) {
  // yes, this is a `let` for later
  const favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}

export default function Contact() {
  const { contact } = useLoaderData() as {
    contact: {
      id: string;
      first: string;
      avatar: string;
      last: string;
      twitter: string;
      notes: string;
    };
  };

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
