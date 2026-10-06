-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Clients Table
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    region VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Matters Table
CREATE TABLE matters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    practice_area VARCHAR(100),
    description TEXT,
    deal_value NUMERIC,
    status VARCHAR(50) DEFAULT 'Active',
    closing_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Users Table (Maps to auth.users for app metadata)
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'Lawyer', -- e.g., 'Lawyer', 'BD', 'Admin'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Matter_Team Table (Many-to-Many between Matters and Users)
CREATE TABLE matter_team (
    matter_id UUID REFERENCES matters(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(100), -- e.g., 'Lead Partner', 'Associate'
    PRIMARY KEY (matter_id, user_id)
);

-- 5. Submissions Table
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    matter_id UUID REFERENCES matters(id) ON DELETE CASCADE,
    directory_name VARCHAR(255) NOT NULL, -- e.g., 'Chambers Global 2027'
    status VARCHAR(50) DEFAULT 'Not Started',
    deadline DATE,
    progress INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. Documents Table
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    matter_id UUID REFERENCES matters(id) ON DELETE CASCADE,
    submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE, -- Optional
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE matters ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE matter_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Basic Policies (Allow authenticated users to read/write everything for now to speed up prototyping)
CREATE POLICY "Allow authenticated read access" ON clients FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert access" ON clients FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update access" ON clients FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON matters FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert access" ON matters FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update access" ON matters FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON submissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert access" ON submissions FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update access" ON submissions FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON users FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON matter_team FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON documents FOR SELECT TO authenticated USING (true);
