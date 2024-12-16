import Cookies from 'js-cookie';


// Function to save user preferences to cookies
export function saveUserPreferences(filters) {
  Cookies.set('filters', JSON.stringify(filters), { expires: 365 }); // Save for 365 days
}

// Function to retrieve user preferences from cookies
export function getUserPreferences() {
  try {
    const filters = Cookies.get('filters');
    return filters ? JSON.parse(filters) : { from: undefined, to: undefined, age: '', gender: '' };
  } catch (error) {
    console.error('Error parsing filters cookie:', error);
    return { from: undefined, to: undefined, age: '', gender: '' }; // Return default values
  }
}

// Function to remove user preferences (reset)
export function clearUserPreferences() {
  Cookies.remove('filters');
}
