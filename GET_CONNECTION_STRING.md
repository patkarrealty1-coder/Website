# Get Your MongoDB Connection String

## In MongoDB Atlas (the page you have open):

### Step 1: Choose Connection Method
Click the green button **"Choose a connection method"**

### Step 2: Select Drivers
Click on **"Drivers"** option

### Step 3: Copy Connection String
You'll see something like this:

```
mongodb+srv://bhiteshsharma2005_db_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### Step 4: Replace <password>
Replace `<password>` with: `io6735l4G58eexPF`

### Step 5: Add Database Name
Add `/patkars-realty` before the `?`:

```
mongodb+srv://bhiteshsharma2005_db_user:io6735l4G58eexPF@cluster0.xxxxx.mongodb.net/patkars-realty?retryWrites=true&w=majority
```

### Step 6: Copy and Paste Here
Copy the complete connection string and paste it in the chat.

---

## Example:
If your cluster is `cluster0.abc123.mongodb.net`, the final string should be:

```
mongodb+srv://bhiteshsharma2005_db_user:io6735l4G58eexPF@cluster0.abc123.mongodb.net/patkars-realty?retryWrites=true&w=majority
```

**The important part is the cluster URL (the part after @)**

Paste your complete connection string here and I'll update the .env file!
