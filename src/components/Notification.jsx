// Notification component, which is used to show notifications to the user based on their actions.
const Notification = ({ message, errorMessage }) => {
    if (message === null && errorMessage === null) {
      return null;
    } else if (message && errorMessage === null) {
      return <div className="green">{message}</div>;
    } else if (errorMessage && message === null) {
      return <div className="error">{errorMessage}</div>;
    }
  };
  
  export default Notification;