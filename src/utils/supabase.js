import { ref } from 'vue';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../environment/environment.js';  // Asumiendo que tienes un archivo con las variables de entorno

const useSupabase = () => {
    const { supabaseUrl, supabaseKey } = environment;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const uploadFile = async (bucketName, filePath, file) => {
        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(filePath, file, {
                upsert: true,
                cacheControl: '3600'
            });

        if (error) {
            throw new Error(error.message);
        }

        return data;
    };

    const getPublicUrl = (bucketName, filePath) => {
        const { data } = supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath);

        return data.publicUrl;
    };

    return {
        uploadFile,
        getPublicUrl
    };
};

export default useSupabase;
