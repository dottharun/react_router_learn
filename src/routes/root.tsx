import { Link, Outlet, useLoaderData } from "react-router-dom";
import { getContacts } from "../contacts";

//should be in different folder - since its a data loader not a component
const loader = async () => {
  const contacts = await getContacts();
  return { contacts };
};

const Root = () => {
  //loads data from nearest ancestor react-router loader
  //[here loader function above defined in main.tsx router]
  const { contacts } = useLoaderData() as {
    contacts: Array<{ id: string; first: string; last: string }>;
  };

  console.log(contacts);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>

        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>

        <nav>
          {contacts.length > 0 ? (
            <ul>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {contacts.map((contact: any) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>

      {/* outlet */}
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
// eslint-disable-next-line react-refresh/only-export-components
export { loader };
