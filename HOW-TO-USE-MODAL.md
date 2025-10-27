# How to Use the Appointment Modal

## Quick Setup (3 Steps)

### Step 1: Add Modal CSS
Add this in the `<head>` section:
```html
<link rel="stylesheet" href="../assets/css/modal.css">
```

### Step 2: Add Modal HTML
Add this before closing `</body>` tag:
```html
<!-- Appointment Modal -->
<div id="appointment-modal" class="modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Book an Appointment</h3>
        <button class="modal-close" data-dismiss="modal">&times;</button>
      </div>
      <div class="modal-body">
        <form id="appointment-form">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Full Name *</label>
                <input type="text" name="name" class="form-control" required>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Email *</label>
                <input type="email" name="email" class="form-control" required>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>Phone *</label>
            <input type="tel" name="phone" class="form-control" required>
          </div>
          <div class="form-group">
            <label>Select Doctor *</label>
            <select name="doctor" class="form-control" required>
              <option>Choose a doctor</option>
              <option>Dr. Meera Sharma</option>
              <option>Dr. Raj Patel</option>
            </select>
          </div>
          <div class="form-group">
            <label>Preferred Date *</label>
            <input type="date" name="date" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-primary w-100">Book Appointment</button>
        </form>
      </div>
    </div>
  </div>
</div>
```

### Step 3: Add Modal JavaScript
Add this before closing `</body>` tag:
```html
<script src="../assets/js/modal.js"></script>
```

## Trigger the Modal

Add this attribute to any button or link:
```html
<a href="#" data-modal="appointment-modal" class="btn btn-primary">
  Book Appointment
</a>
```

## Complete Example

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="../assets/css/style.css">
  <link rel="stylesheet" href="../assets/css/modal.css">
</head>
<body>
  
  <!-- Your content -->
  <button data-modal="appointment-modal" class="btn btn-primary">
    Book Appointment
  </button>
  
  <!-- Modal HTML (copy from above) -->
  <div id="appointment-modal" class="modal">...</div>
  
  <!-- Scripts -->
  <script src="../assets/js/main.js"></script>
  <script src="../assets/js/modal.js"></script>
</body>
</html>
```

## ✅ Pages Already Set Up

The modal is already working on:
- ✅ index.html
- ⚠️ Other pages may need the modal.css and modal.js links added

## Troubleshooting

**Modal doesn't open?**
- Make sure `modal.css` and `modal.js` are loaded
- Check browser console for errors
- Verify the button has `data-modal="appointment-modal"`

**Modal opens but looks broken?**
- Ensure `modal.css` is loaded AFTER `style.css`
- Check that CSS variables are defined in style.css

**Form doesn't submit?**
- The AJAX handler is in `ajax.js`
- You need to set up backend endpoints
- Or handle the submission in modal.js

